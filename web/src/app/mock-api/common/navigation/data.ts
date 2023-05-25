/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const navigation: FuseNavigationItem[] = [
    {
        id: 'streams',
        title: 'Streams',
        tooltip: 'Streams',
        type: 'basic',
        icon: 'mat_outline:videocam',
        link: '/streams'
    },
    {
        id: 'videos',
        title: 'Library',
        tooltip: 'Library',
        type: 'basic',
        icon: 'mat_outline:video_library',
        link: '/videos'
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        type: 'basic',
        icon: 'mat_outline:settings',
        link: '/settings'
    },
];