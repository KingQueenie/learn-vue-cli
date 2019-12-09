
const download = require('download-git-repo');
const request = require('./request');
const { baseURL, orgName, groupId, privateToken } = require('../../config');

class Git {
  constructor() {
  	this.baseURL = baseURL
    this.orgName = orgName;
    this.groupId = groupId;
    this.privateToken = privateToken.split(' ').reverse().join('')
  }

  /**
   * 获取项目组中的项目模板列表
   */
  getProjectList() {
		return request(`/api/v4/groups/${this.groupId}?private_token=${this.privateToken}`)
  }

  /**
   * 下载 git项目
   * @param {Object} param 项目信息 项目名称 项目版本 本地开发目录
   */
	downloadProject({ repo, repoPath }) {
		return new Promise((resolve, reject) => {
			download(`direct:${this.baseURL}/${this.orgName}/${repo}.git`, repoPath, {
				clone: true
			}, (err) => {
				if (err) reject(err);
				resolve(true);
			});
		});
	}
}

module.exports = Git;
