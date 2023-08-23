import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
//我们期望一个newSetting对象看起来像｛setting:newValue｝
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
  .from("settings")
  .update(newSetting)
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  //只有一行设置，ID=1，因此这是更新的设置
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
