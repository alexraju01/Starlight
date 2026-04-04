'use server';
import { fetchData } from '@/utils';

export async function getTvSeasons(id: number) {
  const data = await fetchData<{ number_of_seasons: number }>('3', `tv/${id}`);
  return data.number_of_seasons;
}
