import { supabase } from "../Configs/supabase";

export const fetchUserProfiles = async () => {
  const { data, error } = await supabase.from("userProfiles").select("*");

  if (error) {
    console.error("fetch UserProfiles service: ", error.message);
    throw error;
  }

  const ecoTourUsers = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      ecoTourUsers.push({
        id: data[key].id,
        name: data[key].name,
        user: data[key].user,
      });
    }
  }

  return ecoTourUsers;
};
