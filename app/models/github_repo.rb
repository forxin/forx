require 'open-uri'

class GithubRepo < Struct.new(:name, :url, :user_avatar, :username, :stargazers, :last_commit_on, :last_issue_closed_on, :hub_repo, :important)
  def self.fetch(username, repo_name)
    repo = client.repo("#{username}/#{repo_name}")
    GithubRepo.from_hub_repo(repo, true)
  end

  def rated_forks
    forks_tree = self.forks.map { |t| self.class.from_hub_repo(t, t.full_name == self.name) }

    Ranker.rate_repos(*forks_tree)
  end

  def forks
    hash = Hash.new
    hash[self.name] = self.hub_repo
    forks = self.class.client.forks(self.name, sort: :watchers, per_page: 100)

    if self.hub_repo.parent != nil
      repo = GithubRepo.from_hub_repo(self.hub_repo.parent)
      forks += repo.forks
    end

    forks.each do |fork|
      hash[fork.full_name] ||= fork
    end

    hash.values
  end

  private
  def self.client
    Octokit::Client.new(client_id: ENV['GITHUB_CLIENT_ID'] || '806ddf84f1bea4feb43b',
                        client_secret: ENV['GITHUB_CLIENT_SECRET'] || '2d8e160bf6be8048827ae5012e2a6d08e119794e')
  end

  def self.avatar(repo_owner)
    identicon_url = URI::encode("https://identicons.github.com/#{repo_owner.login}.png")
    "http://www.gravatar.com/avatar/#{repo_owner.gravatar_id}?d=#{identicon_url}&s=420"
  end

  def self.from_hub_repo(repo, important = false)
    GithubRepo.new(repo.full_name, repo.html_url, avatar(repo.owner),
      repo.owner.login, repo.watchers, repo.pushed_at, repo.updated_at, repo, important)
  end
end
