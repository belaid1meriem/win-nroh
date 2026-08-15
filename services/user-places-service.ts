import { supabase } from '@/supabase/supabase';
import type { QueryData } from '@supabase/supabase-js';
import type { Tables, Enums } from '@/supabase/database';

type PlaceStatus = Enums<'place_status'>;
type UserPlace = Tables<'user_places'>;

const userPlacesQuery = supabase
  .from('user_places')
  .select('*, places(*)')
  .order('added_at', { ascending: false });

type UserPlacesWithPlace = QueryData<typeof userPlacesQuery>;

export const userPlacesService = {
  async list(): Promise<UserPlacesWithPlace> {
    const { data, error } = await userPlacesQuery;
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: PlaceStatus): Promise<UserPlace> {
    const { data, error } = await supabase
      .from('user_places')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};