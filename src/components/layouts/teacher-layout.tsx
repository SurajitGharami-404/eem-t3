import { type PropsWithChildren, type FC } from 'react'
import { teacherNavLinks } from '~/config/nav-links';
import { teacherTopBarLinks } from '~/config/top-bar-links';
import Topbar from '~/components/topbar';
import MainSection from '~/components/main-section';
import Sidebar from '~/components/sidebar';

type Props = PropsWithChildren

const TeacherLayout: FC<Props> = ({children}) => {
  return (
    <section className="relative min-h-screen max-w-8xl mx-auto w-full flex flex-col">
        <Topbar links={teacherTopBarLinks}/>
        <div className="flex-1 flex relative">
            <Sidebar links={teacherNavLinks}/>
            <MainSection>{children}</MainSection>
        </div>
    </section>
  )
}

export default TeacherLayout;