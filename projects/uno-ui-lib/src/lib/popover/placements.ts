import { Direction } from './popover.component';

const attachments = {
    top: { attachment: 'bottom center', offset: '12px 0', opposite: 'bottom' },
    topRight: { attachment: 'bottom left', offset: '12px 25px', opposite: 'bottom' },
    topLeft: { attachment: 'bottom right', offset: '12px -25px', opposite: 'bottom' },
    left: { attachment: 'middle right', offset: '0 15px', opposite: 'right' },
    leftBottom: { attachment: 'top right', offset: '22px 15px', opposite: 'right' },
    leftTop: { attachment: 'bottom right', offset: '12px 15px', opposite: 'right' },
    right: { attachment: 'middle left', offset: '0 -15px', opposite: 'left' },
    rightBottom: { attachment: 'top left', offset: '0 -15px', opposite: 'left' },
    rightTop: { attachment: 'bottom left', offset: '0 -15px', opposite: 'left' },
    bottom: { attachment: 'top center', offset: '-12px 0', opposite: 'top' },
    bottomRight: { attachment: 'top left', offset: '-20px 25px', opposite: 'top' },
    bottomLeft: { attachment: 'top right', offset: '-20px -25px', opposite: 'top' },
} as { [key: string]: any };

const PLACEMENTS = Object.keys(attachments).reduce((placements: any, direction: Direction) => {
    const { attachment, offset, opposite } = attachments[direction];
    const targetAttachment = attachments[opposite].attachment;

    placements[direction] = { opposite, attachment, targetAttachment, offset };
    return placements;
}, {});

export function placement(direction: Direction) {
    return PLACEMENTS[direction];
}
