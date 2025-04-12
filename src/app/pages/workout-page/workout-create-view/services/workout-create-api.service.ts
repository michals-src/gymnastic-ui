import { inject, Injectable } from '@angular/core';
import { ApiService } from '@app/shared/services/api.service';

@Injectable()
export class WorkoutCreateApiService {
    private readonly apiService = inject(ApiService);

    getAtlas() {
        return this.apiService.get('/workoutCreate/atlas')
    }
}
