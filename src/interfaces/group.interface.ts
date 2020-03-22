export type Permission = 'READ' | 'WRITE' | 'SHARE' | 'DELETE' | 'UPLOAD_FILES';

export interface GroupInterface {
  id?: string;
  name: string;
  permission: Array<Permission>;
}