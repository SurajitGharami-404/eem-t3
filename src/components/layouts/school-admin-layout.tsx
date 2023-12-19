import { type PropsWithChildren, type FC } from 'react'
import { schoolAdminNavLinks } from '~/config/nav-links';
import { schoolAdminTopBarLinks } from '~/config/top-bar-links';
import Topbar from '~/components/topbar';
import MainSection from '~/components/main-section';
import Sidebar from '~/components/sidebar';

type Props = PropsWithChildren

const SchoolAdminLayout: FC<Props> = ({children}) => {
  return (
    <section className="relative min-h-screen max-w-8xl mx-auto w-full flex flex-col">
        <Topbar links={schoolAdminTopBarLinks}/>
        <div className="flex-1 flex relative">
            <Sidebar links={schoolAdminNavLinks}/>
            <MainSection>{children}</MainSection>
        </div>
    </section>
  )
}

export default SchoolAdminLayout;