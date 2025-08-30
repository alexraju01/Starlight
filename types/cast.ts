export interface CastMember {
  adult: boolean;
  gender: number; // 1 = Female, 2 = Male, 0/undefined = Not specified
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string; // Optional, since it might be null
  character: string;
  credit_id: string;
  order: number;
}
