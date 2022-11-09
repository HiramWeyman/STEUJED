import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { VideosFL } from '../../interfaces/videosfl';

@Injectable()
export class VideosFLService {

    private urlEndPoint = `${environment.rutaAPI}/VideosFL`;
  	constructor(private http: HttpClient) { }

	getVideosFL(): Observable<VideosFL[]> {
	return this.http.get(this.urlEndPoint).pipe(
		map(response => response as VideosFL[])
	);
	}

	getVideo(ids: number): Observable<VideosFL> {
	// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
	return this.http.get<VideosFL>(`${this.urlEndPoint}/${ids}`);
	}
    
	create(videos: VideosFL, Usuario: string): Observable<VideosFL> {
		return this.http.post<VideosFL>(`${this.urlEndPoint + '?usuario==' + Usuario}`, videos);
	  }

	update(videos: VideosFL): Observable<VideosFL> {
		return this.http.put<VideosFL>(`${this.urlEndPoint}/${videos.vid_id}`, videos);
	}

	delete(id: number): Observable<VideosFL> {
		return this.http.delete<VideosFL>(`${this.urlEndPoint}/${id}`);
	}
    
}