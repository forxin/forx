class GithubRepo < Struct.new(:name, :url, :user_avatar, :username, :stargazers, :last_commit_on, :last_issue_closed_on)
  def self.fetch(username, repo_name)
    repo = client.repo("#{username}/#{repo_name}")
    GithubRepo.from_name(repo)
  end

  def rated_forks
    forks = [self] + self.class.client.forks(self.name).map { |t| self.class.from_name(t) }
    Ranker.rate_repos(*forks)
  end

  private
  def self.client
    Octokit::Client.new(client_id: ENV['GITHUB_CLIENT_ID'] || '806ddf84f1bea4feb43b',
                        client_secret: ENV['GITHUB_CLIENT_SECRET'] || '2d8e160bf6be8048827ae5012e2a6d08e119794e')
  end

  def self.from_name(repo)
    @repo = repo

    GithubRepo.new(repo.full_name, repo.html_url, repo.owner.avatar_url,
      repo.owner.login, repo.watchers, repo.pushed_at, repo.updated_at)
  end
end
