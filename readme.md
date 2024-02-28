# CRUD

Album - artist_id, titel, year
Artist - name

Song - album_id, titel
Review - album_id, score, text

## Read

```SQL
SELECT jens_album.*, jens_artist.name AS artist FROM jens_album JOIN jens_artist ON jens_album.artist_id = jens_artist.id
```
