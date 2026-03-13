import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiBorderCrossing {
  id: number;
  peopleId: number;
  userId: number;
  departureDate: string;
  returnDate: string | null;
  outsideBorder: boolean;
  country: string | null;
  description: string | null;
}

export interface ApiPerson {
  id: number;
  fullName: string | null;
}

export interface ApiUser {
  id: number;
  fullName: string | null;
}

export interface CreateBorderCrossingRequest {
  peopleId: number;
  userId: number;
  departureDate: string;
  returnDate: string | null;
  outsideBorder: boolean;
  country: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class BorderCrossingService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/border-crossings`;
  private readonly peopleApiUrl = `${environment.apiBaseUrl}/api/people`;
  private readonly usersApiUrl = `${environment.apiBaseUrl}/api/users`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ApiBorderCrossing[]> {
    return this.http
      .get<ApiResponse<ApiBorderCrossing[]>>(this.apiUrl)
      .pipe(map((response) => response.data ?? []));
  }

  getById(id: number): Observable<ApiBorderCrossing | null> {
    return this.http
      .get<ApiResponse<ApiBorderCrossing> | ApiBorderCrossing>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => {
          if (this.isApiWrapper<ApiBorderCrossing>(response)) {
            return response.data ?? null;
          }
          return response ?? null;
        })
      );
  }

  create(payload: CreateBorderCrossingRequest): Observable<ApiBorderCrossing | null> {
    return this.http
      .post<ApiResponse<ApiBorderCrossing> | ApiBorderCrossing>(this.apiUrl, payload)
      .pipe(
        map((response) => {
          if (this.isApiWrapper<ApiBorderCrossing>(response)) {
            return response.data ?? null;
          }
          return response ?? null;
        })
      );
  }

  update(id: number, payload: CreateBorderCrossingRequest): Observable<ApiBorderCrossing | null> {
    return this.http
      .put<ApiResponse<ApiBorderCrossing> | ApiBorderCrossing>(`${this.apiUrl}/${id}`, payload)
      .pipe(
        map((response) => {
          if (this.isApiWrapper<ApiBorderCrossing>(response)) {
            return response.data ?? null;
          }
          return response ?? null;
        })
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPeople(): Observable<ApiPerson[]> {
    return this.http
      .get<ApiResponse<ApiPerson[]> | ApiPerson[]>(this.peopleApiUrl)
      .pipe(map((response) => this.unwrapArray<ApiPerson>(response)));
  }

  getUsers(): Observable<ApiUser[]> {
    return this.http
      .get<ApiResponse<ApiUser[]> | ApiUser[]>(this.usersApiUrl)
      .pipe(map((response) => this.unwrapArray<ApiUser>(response)));
  }

  private unwrapArray<T>(response: ApiResponse<T[]> | T[]): T[] {
    if (Array.isArray(response)) {
      return response;
    }
    return response.data ?? [];
  }

  private isApiWrapper<T>(value: unknown): value is ApiResponse<T> {
    return !!value && typeof value === 'object' && 'data' in value;
  }
}
