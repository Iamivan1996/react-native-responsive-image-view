import {
  mockUriGood,
  mockUriBad,
  mockUriSlowGood,
  mockUriSlowBad,
  mockResourceGood,
  mockWidth,
  mockHeight,
} from './test-fixtures';

jest.mock('Image', () => ({
  getSize(uri, onLoad, onError) {
    switch (uri) {
      case mockUriGood:
        onLoad(mockWidth, mockHeight);
        break;
      case mockUriBad:
        onError(new Error(uri));
        break;
      case mockUriSlowGood:
        setImmediate(onLoad);
        break;
      case mockUriSlowBad:
        setImmediate(() => {
          onError(uri);
        });
        break;
      default:
        throw new Error(`Unexpected URI value in test: ${uri}`);
    }
  },
}));

jest.mock('react-native/Libraries/Image/resolveAssetSource', () => res => {
  if (res === mockResourceGood) {
    return { width: mockWidth, height: mockHeight };
  }
  return null;
});
