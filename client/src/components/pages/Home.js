import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet";
import * as THREE from "three";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    // Initialize Scene
    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const canvas = document.getElementById("home-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Reposition Camera
    camera.position.z = 5;

    /*
    // Add Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    */

    // Add Particle System
    function getParticleBuffer(particleCount) {
      const pos = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        pos[i] = THREE.MathUtils.randFloatSpread(50);
        if (Math.abs(pos[i]) < 2) {
          if (pos[i] === 0) {
            pos[i] += 2;
          }
          pos[i] *= 2;
        }
      }
      console.log(pos);
      return pos;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(getParticleBuffer(400), 3));
    const cloud = loader.load(`https://i.imgur.com/1AjUWpI.png`);
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      map: cloud,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    // Load backgorund texture
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

    // Handle Responsiveness
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

    //Record mouse position
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastTargetX = targetX;
    let lastTargetY = targetY;
    function onDocumentMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }
    document.addEventListener("mousemove", onDocumentMouseMove);

    // Handle Animation
    const clock = new THREE.Clock();
    const animate = () => {
      // Determine frametime
      const elapsedTime = clock.getDelta();

      // Provide Natural Rotation
      /*
      cube.rotation.y += 0.1 * elapsedTime;
      */
      particleSystem.rotation.y -= 0.1 * elapsedTime;

      // Provided additional mouse rotation
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      const deltaY = Math.abs(targetY - lastTargetY) < 0.1 ? targetY - lastTargetY : 0;
      const deltaX = Math.abs(targetX - lastTargetX) < 0.1 ? targetX - lastTargetX : 0;
      particleSystem.rotation.x += 50 * elapsedTime * deltaY;
      particleSystem.rotation.x %= 360;
      particleSystem.rotation.y += 50 * elapsedTime * deltaX;
      particleSystem.rotation.y %= 360;
      particleSystem.position.z += 10 * elapsedTime * deltaY;

      // Render
      renderer.render(scene, camera);

      // Call again on the next frame
      lastTargetX = targetX;
      lastTargetY = targetY;
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <>
      <canvas id="home-canvas" className="body" />
      <div className="Home-container">
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
    </>
  );
};

export default Home;
