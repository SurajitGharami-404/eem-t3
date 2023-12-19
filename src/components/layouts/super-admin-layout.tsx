import { type PropsWithChildren, type FC } from 'react'
import { superAdminNavLinks } from '~/config/nav-links';
import { superAdminTopBarLinks } from '~/config/top-bar-links';
import Topbar from '~/components/topbar';
import MainSection from '~/components/main-section';
import Sidebar from '~/components/sidebar';

type Props = PropsWithChildren

const SuperAdminLayout: FC<Props> = ({children}) => {
  return (
    <section className="relative min-h-screen max-w-8xl mx-auto w-full flex flex-col">
        <Topbar links={superAdminTopBarLinks}/>
        <div className="flex-1 flex relative">
            <Sidebar links={superAdminNavLinks}/>
            <MainSection>{children}</MainSection>
        </div>
    </section>
  )
}

export default SuperAdminLayout;