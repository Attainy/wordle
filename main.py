from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'TRAIN'

@app.get('/answer')
def get_anser():
    return {'answer': answer}

# static 폴더 안에 있는 파일들
app.mount("/", StaticFiles(directory="static", html=True), name="static")