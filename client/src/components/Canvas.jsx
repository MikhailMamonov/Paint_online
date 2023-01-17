import "./../styles/canvas.scss";

import React, { useEffect, useState } from "react";

import Brush from "../tools/Brush";
import Button from "react-bootstrap/Button";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Modal from "react-bootstrap/Modal";
import Rect from "../tools/Rect";
import axios from "axios";
import canvasState from "../store/canvasState";
import { observer } from "mobx-react-lite";
import toolState from "../store/toolState";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let ctx = canvasRef.current.getContext("2d");
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((response) => {
        console.log(response);
        if (response.data) {
          const img = new Image();
          img.src = response.data;
          img.onload = () => {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          };
        }
      });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(
        `ws://${process.env.REACT_APP_BASE_URL}:5000/`
      );
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("Connection is established");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };

      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(`Пользователь ${msg.username} вошепл в систему`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          default:
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(
          ctx,
          figure.x,
          figure.y,
          figure.strokeColor,
          figure.lineWidth
        );
        break;
      case "finish":
        ctx.beginPath();
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.strokeColor,
          figure.lineWidth
        );
        ctx.beginPath();
        break;
      case "circle":
        Circle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.color,
          figure.strokeColor,
          figure.lineWidth
        );
        ctx.beginPath();
        break;
      case "line":
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.strokeColor,
          figure.lineWidth
        );
        ctx.beginPath();
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      default:
        break;
    }
  };
  const onMouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const onMouseUpHandler = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_BASE_URL}:5000/image?id=${params.id}`,
        {
          img: canvasRef.current.toDataURL(),
        }
      )
      .then((res) => console.log(res.data));
  };
  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };
  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              connectHandler();
            }}
          >
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});

export default Canvas;
