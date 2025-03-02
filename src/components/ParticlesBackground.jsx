import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10 h-full"
      init={particlesInit}
      options= {{
        fullScreen: {
            enable: false,
            zIndex: -1
          },
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 900
              }
            },
            color: {
              value: ["#64748b", "#94a3b8", "#cbd5e1", "#475569"]
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              },
              polygon: {
                nb_sides: 5
              }
            },
            opacity: {
              value: 0.3,
              random: false,
              anim: {
                enable: false,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 180,
              color: "#94a3b8",
              opacity: 0.3,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 300,
                rotateY: 600
              }
            }
          },
          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              },
              bubble: {
                distance: 200,
                size: 4,
                duration: 2,
                opacity: 0.6,
                speed: 2
              },
              push: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
            
          }
        }
    />
  );
};

export default ParticlesBackground;