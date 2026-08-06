from typing import Literal, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI(title="cthnn-portfolio metadata api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


class WorldObject(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    type: Literal["project", "about"]
    title: str
    desc: str
    texture_url: str = Field(alias="textureUrl")
    position: tuple[float, float, float]
    gh_link: Optional[str] = Field(default=None, alias="ghLink")


OBJECTS: list[WorldObject] = [
    WorldObject(
        id="about",
        type="about",
        title="About Me",
        desc=(
            "Hello! My name is Ethan Cheung and welcome to my portfolio. Firstly, let me "
            "introduce myself as a Software Developer. I have experience building industry "
            "leading software in Cloud Infrastructure, MLOps, Cybersecurity & Privacy, Data "
            "Science, and AI & Machine Learning. Most recently, I am working as a Platform "
            "Engineer at Agility Robotics. "
            "As you continue to explore my portfolio, I want to share an experience that "
            "represents myself and to share a mix of my passions. I'm excited about creating "
            "impactful software and like to make it fun along the way. On my freetime you'll "
            "catch me keeping up with the latest in AR/VR & Graphics technology, taking "
            "pictures, running with my Husky or practicing my juggling skills with the "
            "Diabolo. I'm excited to be sharing an experience through my portfolio showcasing "
            "my passion and creativity for building software. "
            "Ethan Cheung"
        ),
        texture_url="/masked.png",
        position=(0, 2, -5),
    ),
    WorldObject(
        id="project-1",
        type="project",
        title="Cthnn Portfolio",
        desc=(
            "Welcome to my portfolio!! I am so excited for you to explore my portfolio "
            "and learn more about me and my work as a developer. You might be wondering "
            "\"what's up with all the clouds\" though. I added interactive clouds because "
            "my middle name means smiling cloud in Chinese. This was developed with React "
            "Three Fiber."
        ),
        texture_url="/portfolio.png",
        position=(12, 2, -8),
        gh_link="https://github.com/Cthnn/cthnn-portfolio",
    ),
    WorldObject(
        id="project-2",
        type="project",
        title="NVIDIA Self-Driving Car",
        desc=(
            "A project I led during my undergraduate research. The goal was to build a "
            "low-budget self driving car with an NVIDIA Jetson Nano and a lightweight "
            "steering angel prediction model. This project implemented a CNN architecture "
            "from an NVIDIA research paper using Pytorch and OpenCV."
        ),
        texture_url="/car.png",
        position=(-12, 2, -8),
        gh_link="https://github.com/Cthnn/VIP-Autonomous-Car",
    ),
    WorldObject(
        id="project-3",
        type="project",
        title="Flight Simulator",
        desc=(
            "This program is a flight simulator allowing users to traverse a 3D "
            "environment using keyboard controls. I built this as an exploration into "
            "graphics development using OpenGL and GLSL which I later expanded into a "
            "simulator to gather training data."
        ),
        texture_url="/fs.png",
        position=(12, 2, -20),
        gh_link="https://github.com/Cthnn/Flight-Simulation",
    ),
    WorldObject(
        id="project-4",
        type="project",
        title="Colts Redistrict",
        desc=(
            "A React web application with a Java Spring Boot backend for adjusting "
            "state district boundaries to minimize the effects of gerrymandering. "
            "GeoJSON boundaries were redrawn using Shapely's Python library on an HPC."
        ),
        texture_url="/redistrictor.png",
        position=(-12, 2, -20),
        gh_link="https://github.com/Cthnn/CSE-416-Colts",
    ),
]

OBJECTS_BY_ID = {obj.id: obj for obj in OBJECTS}


@app.get("/api/objects", response_model=list[WorldObject], response_model_by_alias=True)
def list_objects(type: Optional[Literal["project", "about"]] = Query(default=None)):
    if type is None:
        return OBJECTS
    return [obj for obj in OBJECTS if obj.type == type]


@app.get("/api/objects/{object_id}", response_model=WorldObject, response_model_by_alias=True)
def get_object(object_id: str):
    obj = OBJECTS_BY_ID.get(object_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="object not found")
    return obj
