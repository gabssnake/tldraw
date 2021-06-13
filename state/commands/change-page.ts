import Command from './command'
import history from '../history'
import { Data } from 'types'
import storage from 'state/storage'

export default function changePage(data: Data, pageId: string) {
  const { currentPageId: prevPageId } = data

  history.execute(
    data,
    new Command({
      name: 'change_page',
      category: 'canvas',
      manualSelection: true,
      do(data) {
        storage.savePage(data, data.document.id, prevPageId)
        data.currentPageId = pageId
        storage.loadPage(data)
      },
      undo(data) {
        data.currentPageId = prevPageId
        storage.loadPage(data, prevPageId)
      },
    })
  )
}