export default class IpCheck {
  static CheckIpRangeValid(entry) {
    const blocks = entry.trim().split('.');
    if (blocks.length === 4 && !!blocks[3]) {
      return blocks.every((item, index) => {
        if (index === 3) {
          if (item.includes('/')) {
            const last = item.split('/');
            if (last.length !== 2) {
              return false;
            }
            const [tmpI, mainL] = last;
            if (mainL === '') return false;
            const m = Number(mainL);
            item = tmpI;
            if (mainL.includes(' ') || Number.isNaN(m) || m > 32 || m < 0) {
              return false;
            }
          }
        }
        if (item.includes(' ')) {
          return false;
        }
        const num = Number(item);
        return item && !Number.isNaN(num) && num >= 0 && num <= 255;
      });
    }
    return false;
  }

  static CheckIpValid(entry) {
    const blocks = entry.trim().split('.');
    if (blocks.length === 4 && !!blocks[3]) {
      return blocks.every(item => {
        if (item.includes(' ')) {
          return false;
        }
        const num = Number(item);
        return item && !Number.isNaN(num) && num >= 0 && num <= 255;
      });
    }
    return false;
  }
}
