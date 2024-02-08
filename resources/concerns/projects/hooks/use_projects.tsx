import usePageProps from '@/hooks/use_page_props'
import type { Project } from '../types/project'

export default function useProjects() {
  const props = usePageProps<{
    user: {
      projects: Array<Project>
    }
  }>()

  return props.user.projects
}