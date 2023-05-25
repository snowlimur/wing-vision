FROM golang:1.20-alpine as build

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -gcflags "all=-N -l" -o /app ./

FROM alpine AS dev

COPY --from=build /app /

ENTRYPOINT ["/app"]