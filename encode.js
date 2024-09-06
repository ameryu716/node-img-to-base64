import * as fs from 'fs'
import { intro, outro, confirm, select, multiselect, spinner, isCancel, cancel, text } from '@clack/prompts'

const encode = async () => {
  intro("Converter start.")
  const _files = fs.readdirSync(import.meta.dirname)
  const _img_files = _files.filter(file_name => {
    const _split = file_name.split('.')
    const extention = _split.at(-1)
    return ['png', 'jpeg', 'jpg'].includes(extention.toLowerCase())
  })
  if (_img_files.length === 0) {
    cancel('Img file not found.')
    return 0
  }
  const _options = _img_files.map(file_name => {
    return {
      label: file_name,
      value: file_name,
    }
  })
  const selected_file_name = await select({
    message: 'Please select target img.',
    options: _options,
  })

  const base64 = fs.readFileSync(`./${selected_file_name}`, 'base64')
  const txtfile = fs.writeFileSync(`./out-${selected_file_name}.base64.txt`, base64)
  outro("Converted! Bye.")
}
encode()


// const file_name = "image6"