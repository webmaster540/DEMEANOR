import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './posts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType],
}
