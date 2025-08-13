import React from "react";
import "../css/Carousel.css";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import about from '@/data/about.json'
import { Paper, Typography } from "@mui/material";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import AnimationRoundedIcon from '@mui/icons-material/AnimationRounded'

const data = about 

const carousel: KeenSliderPlugin = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};
function skillIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('react')) return <AutoAwesomeRoundedIcon />
  if (n.includes('node')) return <StorageRoundedIcon />
  if (n.includes('mui') || n.includes('material')) return <LayersRoundedIcon />
  if (n.includes('gsap')) return <AnimationRoundedIcon />
  return <CodeRoundedIcon />
}
export default function Carousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <div className="wrapper">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          {data.skills?.map((skill) => (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                    }}
                    className="carousel__cell"
                    aria-label={skill}
                  >
                    {skillIcon(skill)}
                    <Typography variant="body2" fontWeight={600}>
                      {skill}
                    </Typography>
                  </Paper>
              ))}
        </div>
      </div>
    </div>
  );
}
