from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import products, blog, testimonials, quiz, about

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Arvaya API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://arvaya.in"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(blog.router, prefix="/api/blog", tags=["blog"])
app.include_router(testimonials.router, prefix="/api/testimonials", tags=["testimonials"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["quiz"])
app.include_router(about.router, prefix="/api/about", tags=["about"])


@app.get("/health")
def health():
    return {"status": "ok"}
