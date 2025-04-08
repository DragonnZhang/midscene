/// <reference types="chrome" />
import { globalThemeConfig } from '@midscene/visualizer';
import '@midscene/visualizer/index.css';
import { ConfigProvider } from 'antd';
import { BrowserExtensionPlayground } from '../component/playground';
import { getExtensionVersion } from '../utils';
import './popup.less';
import {
  ChromeExtensionProxyPage,
  ChromeExtensionProxyPageAgent,
} from '@midscene/web/chrome-extension';

// remember to destroy the agent when the tab is destroyed: agent.page.destroy()
const extensionAgentForTab = (forceSameTabNavigation = true) => {
  const page = new ChromeExtensionProxyPage(forceSameTabNavigation);
  return new ChromeExtensionProxyPageAgent(page);
};

declare const __SDK_VERSION__: string;

export function PlaygroundPopup() {
  const extensionVersion = getExtensionVersion();

  return (
    <ConfigProvider theme={globalThemeConfig()}>
      <div className="popup-wrapper">
        <div className="popup-header" />
        <div className="tabs-container">
          <div className="popup-playground-container">
            <BrowserExtensionPlayground
              getAgent={(forceSameTabNavigation?: boolean) => {
                return extensionAgentForTab(forceSameTabNavigation);
              }}
              showContextPreview={false}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
