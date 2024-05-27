import { createRoot } from 'react-dom/client'

// 引入 icons svg 雪碧图
import './icons'
import App from './app'
import './styles/global.less'

createRoot(document.getElementById('root')!).render(<App />)
