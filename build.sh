#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Начинаем очистку и сборку Docker ===${NC}"

echo -e "${GREEN}Проверяем доступное место на диске...${NC}"
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
if [ "$DISK_USAGE" -ge 90 ]; then
  echo -e "${YELLOW}=== ПРЕДУПРЕЖДЕНИЕ: Место на диске менее 10% (${DISK_USAGE}% используется). Рекомендуется очистить диск перед продолжением ===${NC}"
  exit 1
fi

echo -e "${GREEN}Останавливаем и удаляем все контейнеры...${NC}"
docker compose down

echo -e "${GREEN}Очищаем неиспользуемые образы, сети и кэш...${NC}"
docker system prune -a -f --volumes

echo -e "${GREEN}Выполняем пересборку образов...${NC}"
docker compose build --no-cache

echo -e "${GREEN}Запускаем сервисы...${NC}"
docker compose up -d

echo -e "${GREEN}Проверяем статус контейнеров...${NC}"
docker compose ps -a

echo -e "${GREEN}Текущее использование места Docker...${NC}"
docker system df

echo -e "${GREEN}=== Сборка и очистка завершены ===${NC}"
