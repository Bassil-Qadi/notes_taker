import {
    HiOutlineChartSquareBar,
    HiOutlineUserGroup,
    HiOutlineTrendingUp,
    HiOutlineUserCircle,
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineShieldCheck,
    HiOutlineColorSwatch,
    HiOutlineChatAlt,
    HiOutlineDesktopComputer,
    HiOutlinePaperAirplane,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiOutlineKey,
    HiOutlineBan,
    HiOutlineHand,
    HiOutlineDocumentText,
    HiOutlineTemplate,
    HiOutlineLockClosed,
    HiOutlineDocumentDuplicate,
    HiOutlineViewGridAdd,
    HiOutlineShare,
    HiOutlineVariable,
    HiOutlineCode,
    HiOutlinePhotograph,
    HiDocumentDuplicate,
    HiOutlineScissors,
    HiOutlineCalendar,
    HiOutlineHome,
    HiOutlineArchive 
} from 'react-icons/hi'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

import { LiveHelpOutlined, LocalOfferOutlined } from '@mui/icons-material';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    apps: <HiOutlineViewGridAdd />,
    project: <HiOutlineArchive />,
    crm: <HiOutlineUserGroup />,
    bookings: <HiOutlineCalendar  />,
    sales: <HiOutlineHome />,
    crypto: <HiOutlineCurrencyDollar />,
    knowledgeBase: <LiveHelpOutlined />,
    account: <HiOutlineUserCircle />,
    uiComponents: <HiOutlineTemplate />,
    common: <HiOutlineColorSwatch />,
    feedback: <HiOutlineChatAlt />,
    dataDisplay: <HiOutlineDesktopComputer />,
    forms: <HiOutlineDocumentText />,
    navigation: <HiOutlinePaperAirplane />,
    graph: <HiOutlineChartPie />,
    authentication: <HiOutlineLockClosed />,
    signIn: <HiOutlineShieldCheck />,
    signUp: <HiOutlineUserAdd />,
    forgotPassword: <HiOutlineLockClosed />,
    resetPassword: <HiOutlineKey />,
    pages: <HiOutlineDocumentDuplicate />,
    welcome: <HiOutlineHand />,
    accessDenied: <HiOutlineBan />,
    guide: <HiOutlineBookOpen />,
    documentation: <HiOutlineDocumentText />,
    sharedComponentDoc: <HiOutlineShare />,
    utilsDoc: <HiOutlineVariable />,
    changeLog: <HiOutlineCode />,
    banner: <LocalOfferOutlined  />,
    ppPages: <HiOutlinePhotograph  />,
    clinic: <StoreOutlinedIcon />
}

export default navigationIcon
