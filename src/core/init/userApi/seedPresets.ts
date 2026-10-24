import presets from '@/assets/userApiPresets.json'
import { importUserApi } from '@/core/userApi'

const presetScripts: string[] = (presets as { order: string[]; scripts: string[] }).scripts

let hasSeeded = false

/**
 * Seed built-in user-api sources on first launch (when the user has no custom
 * sources yet), so a fresh install is playable out of the box.
 * Returns the id of the first preset (juhe) to use as the default active source.
 */
export const seedUserApiPresets = async(): Promise<string | null> => {
  if (hasSeeded) return null
  hasSeeded = true
  let defaultId: string | null = null
  for (const script of presetScripts) {
    try {
      const info = await importUserApi(script)
      if (defaultId == null) defaultId = info.id
    } catch (err) {
      console.log('[seedUserApiPresets] failed to add a preset source:', err)
    }
  }
  return defaultId
}
