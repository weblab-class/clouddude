import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet";
import * as THREE from "three";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const canvas = document.getElementById("home-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const loader = new THREE.TextureLoader();
    loader.load("https://i.imgur.com/51ieg5J.png", (texture) => {
      scene.background = texture;

      // Handle Resize
      const canvasSize = window.innerWidth / window.innerHeight;
      const backgroundSize = 1600 / 900;
      const resizeFactor = backgroundSize / canvasSize;
      if (resizeFactor > 1) {
        scene.background.offset.x = (1 - 1 / resizeFactor) / 2;
        scene.background.repeat.x = 1 / resizeFactor;
        scene.background.offset.y = 0;
        scene.background.repeat.y = 1;
      } else {
        scene.background.offset.x = 0;
        scene.background.repeat.x = 1;
        scene.background.offset.y = (1 - resizeFactor) / 2;
        scene.background.repeat.y = resizeFactor;
      }
    });

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      // Handle background resize
      const canvasSize = window.innerWidth / window.innerHeight;
      const backgroundSize = 1600 / 900;
      const resizeFactor = backgroundSize / canvasSize;
      if (resizeFactor > 1) {
        scene.background.offset.x = (1 - 1 / resizeFactor) / 2;
        scene.background.repeat.x = 1 / resizeFactor;
        scene.background.offset.y = 0;
        scene.background.repeat.y = 1;
      } else {
        scene.background.offset.x = 0;
        scene.background.repeat.x = 1;
        scene.background.offset.y = (1 - resizeFactor) / 2;
        scene.background.repeat.y = resizeFactor;
      }

      // Handle canvas resize
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();
  }, []);

  return (
    <div className="Home-container">
      <canvas id="home-canvas" className="body" />
      <div id="home-content">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <center className="Home-centered">
          <h1 className="title">PLATFORMER</h1>
          <Link to="/repository/" className="NavBar-link">
            <Button variant="primary">Play A Level</Button>
          </Link>
          <Link to="/leveleditor/" className="NavBar-link">
            <Button variant="primary">Design A Level</Button>
          </Link>
          <p />
          <p />
          <h2 className="subtitle">
            A web game where YOU can create levels with obstacles and platforms with the goal of
            going from point A and point B.
          </h2>
        </center>
      </div>
    </div>
  );
};

export default Home;
