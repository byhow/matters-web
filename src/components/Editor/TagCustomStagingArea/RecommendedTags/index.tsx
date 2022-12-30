import { Tag, Translate } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'

import styles from './styles.css'

type RecommendedTagsProps = {
  tags: EditorRecommendedTags_user_tags_edges_node[]
  onAddTag: (tag: SelectTag) => void
}

const RecommendedTags: React.FC<RecommendedTagsProps> = ({
  tags,
  onAddTag,
}) => {
  return (
    <section className="recommendedTags">
      <p className="hint">
        <Translate id="hintAddRecommendedTag" />
      </p>

      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              active
              disabled
              onClick={() => onAddTag(tag)}
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default RecommendedTags
