import { BlockType } from '../models/BlockPage'

export type PackageOrientationData = {
  'id': number
  'is_paid': boolean
  'quote_id': number | null
  'order_id': number | null
  'reserve': string | null
  'date_init': string | null
  'date_end': string | null
  'payment_status': string | null
  'whatsapp_group': string | null
  'clients': ClientPackageOrientation[],
  'expired': boolean,
  'is_expired': boolean,
  'pkg': {
    'title': string
    'type': string
  }
  'ship': {
    'id': number | null
    'name': string | null
  }
  'cruiseline': {
    'id': number | null
    'name': string | null
    'link': string | null
  }
  'ports': PortPackageOrientation[]
  'collaborator': CollaboratorPackageOrientation
  'all_inclusive_id'?: number,
  'page_blocks': BlockType[]
}

export type PortPackageOrientation = {
  'id': number
  'name': string
  'translation'?: string
  'link'?: string
}

export type ClientPackageOrientation = {
  'id': number
  'user_id': number
  'parent_id': number
  'cpf': string | null
  'name': string
  'last_name': string | null
  'phone': string | null
  'email': string
  'avatar': null
  'avatar_url': null
}

export type CollaboratorPackageOrientation = {
  'id': number,
  'name': string,
  'email': string,
  'avatar_url': string
}
