import axios from 'axios';

const baseUrl = 'http://10.214.192.22:8088';

function axiosFetch(url, query) {
  return axios
    .get(`${baseUrl}${url}?${query}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

// 获取基金权重列表
export const getFundsPortfolio = (params) => axiosFetch(`/basic/portfolio`, `date=${params}`);
// 获得本策略评价指标
export const getEvaluationIndex = (params) => axiosFetch('/basic/metric', `date=${params}`);
// 获得基金最新一次调仓权重
export const getLatestRepositioning = (params) => axiosFetch('/basic/portfolio_change', `date=${params}`);
// 获取基金的成分股
export const getConstituentStocks = (params) => axiosFetch('/detail/constituent_stocks', params);
// 矩形树状图数据
export const getRectangularTreeDiagram = (params) => axiosFetch('/rect_tree', `date=${params}`);
// 获取折线图所需全部信息。两个价格信息、新闻信息
export const getLineChartInfo = (params) => axiosFetch('/line', params);
// 获得当日新闻的taxonomy
export const getTreeChart = (params) => axiosFetch('/explainable/taxonomy', `date=${params}`);
// 获得当日调仓逻辑
export const getOnTheDayTradingLogic = (params) => axiosFetch('/explainable/reason', `date=${params}`);
// 获得当日的热词
export const getHotWords = (params) => axiosFetch('/explainable/hot_words', `date=${params}`);
