FROM python:3.11-slim

WORKDIR /api

RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1

EXPOSE 5000


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
