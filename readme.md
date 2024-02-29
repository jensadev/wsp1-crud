# CRUD
Create, Read, Update, Delete

## Tabeller för databas

Album - artist_id, titel, year
Artist - name

Song - album_id, titel
Review - album_id, score, text

## Routes, REST

- [x] GET / - landing

- [x] GET /artists - Hämta och visa alla artister, SELECT * FROM artist
- [x] GET /artists/:id - Hämta och visa en artist, SELECT * FROM artist WHERE id = :id

- [x] GET /artists/new - Skapa en ny artist, visa formulär
- [x] POST /artists/new - Skapar den nya artisten, INSERT INTO

## Read

```SQL
SELECT jens_album.*, jens_artist.name AS artist FROM jens_album JOIN jens_artist ON jens_album.artist_id = jens_artist.id
```