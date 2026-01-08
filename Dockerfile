FROM node:18-alpine

# 1. pnpm 설치
RUN npm install -g pnpm

WORKDIR /app

# 2. pnpm 사용을 위한 파일 복사
COPY package.json pnpm-lock.yaml ./

# 3. pnpm으로 의존성 설치
RUN pnpm install

# 4. 나머지 파일 복사
COPY . .

# 5. 빌드 명령어 (필요에 따라 조정)
RUN pnpm run build

CMD ["pnpm", "run", "start"]