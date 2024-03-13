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

- [x] GET /artists/:id/edit - visa formulär för att uppdatera en artist
- [x] POST /artists/:id - uppdatera artisten, UPDATE

- [x] GET /artists/:id/delete - ta bort artisten
- [x] POST /artists/:id/delete - ta bort artisten, DELETE

## Read

```SQL
SELECT jens_album.*, jens_artist.name AS artist FROM jens_album JOIN jens_artist ON jens_album.artist_id = jens_artist.id
```

## Create


## Update

PUT request, stöds inte av forms i webbläsare
XHTMLRequest, för att skicka PUT request

Vanlig lösning är att skicka en POST request 

REST route för detta

GET /artists/:id/edit - visa formulär för att uppdatera en artist
POST /artists/:id - uppdatera artisten

```SQL	
UPDATE jens_album SET titel = 'Nytt namn' WHERE id = 1
```

## Delete

DELETE request, stöds inte av forms i webbläsare

Vanlig lösning är att skicka en POST request eller en GET request

REST route för detta

GET eller POST till /artists/:id/delete - ta bort artisten

```SQL
DELETE FROM jens_album WHERE id = 1
```