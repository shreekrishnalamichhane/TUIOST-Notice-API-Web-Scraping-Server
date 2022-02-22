## TUIOST Notice Api Server

This is a api server using web scraping using NodeJs.

# Installation

1. Clone the github repo.
2. run `npm install`.
3. run `npm run dev` for development environment.
4. or run `npm start` for production environment.

# Routes

It returns latest notices (Max 20) from the IOST Website.

```url
{BASE_LINK}/watch/notice
```

---

It returns latest schedules (Max 20) from the IOST Website.

```url
{BASE_LINK}/watch/schedule
```

---

It returns latest results (Max 20) from the IOST Website.

```url
{BASE_LINK}/watch/result
```

---

It returns all the notices from the IOST Website.

```url
{BASE_LINK}/get/notice
```

---

It returns all the schedules from the IOST Website.

```url
{BASE_LINK}/get/schedule
```

---

It returns all the results from the IOST Website.

```url
{BASE_LINK}/get/result
```
