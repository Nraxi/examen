FROM golang:1.19

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
COPY .env .
RUN go build -v -o ./dist/app ./cmd/main.go

FROM debian:bullseye-slim

WORKDIR /root/
COPY --from=0 /usr/src/app/dist/ ./
COPY .env ./

EXPOSE 9002
CMD ["./app"]