import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { DraftDigest, Spinner, Translate } from '~/components'

import Collapsable from '../Collapsable'

import {
  MeDraftsSidebar,
  MeDraftsSidebar_viewer_drafts_edges
} from './__generated__/MeDraftsSidebar'

const ME_DRAFTS_SIDEBAR = gql`
  query MeDraftsSidebar {
    viewer {
      id
      drafts(input: { first: null }) @connection(key: "viewerDrafts") {
        edges {
          node {
            id
            ...DraftDigestSidebarDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Sidebar.fragments.draft}
`

const DraftList = ({ currentId }: { currentId: string }) => {
  const { data, loading } = useQuery<MeDraftsSidebar>(ME_DRAFTS_SIDEBAR)
  const edges = data?.viewer?.drafts.edges

  return (
    <Collapsable title={<Translate id="draft" />}>
      {loading && <Spinner />}
      {edges &&
        edges
          .filter(
            ({ node }: MeDraftsSidebar_viewer_drafts_edges) =>
              node.id !== currentId
          )
          .map(({ node }: MeDraftsSidebar_viewer_drafts_edges, i: number) => (
            <DraftDigest.Sidebar key={i} draft={node} />
          ))}
    </Collapsable>
  )
}

export default DraftList
