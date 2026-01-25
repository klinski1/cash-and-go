FROM python:3.11-slim

# Устанавливаем зависимости для сборки (если нужно psycopg2 или другие C-библиотеки)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /api
ENV PYTHONPATH=/api \
    PYTHONUNBUFFERED=1 \
    TZ=Asia/Bangkok

# Копируем и устанавливаем зависимости (кешируем слой)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект
COPY . .

# Делаем entrypoint исполняемым
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Устанавливаем часовой пояс (лучше через ENV, но ln -snf тоже работает)
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Создаём непривилегированного пользователя и группу (это ключевой момент!)
RUN addgroup --system --gid 1000 app && \
    adduser --system --uid 1000 --gid 1000 --no-create-home --disabled-password --gecos "" app && \
    chown -R app:app /api

# Переключаемся на непривилегированного пользователя
USER app

EXPOSE 5000

# ENTRYPOINT и CMD
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD []