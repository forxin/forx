class Ranker
  def self.rate_repos(*repositories)
    total = 0
    repositories.each.map do |repo|
      score = self.repo_score(repo.stargazers, days_since_now(repo.last_commit_on),
        days_since_now(repo.last_issue_closed_on))
      total += score
      Repository.new(repo.name, repo.url, repo.user_avatar, repo.username, score)
    end.each do |repo|
      repo.score = (repo.score / total) * 100
    end
  end

  private
  def self.days_since_now(date)
    (Date.today - date.to_date).to_i
  end

  def self.repo_score(stargazers, days_since_last_commit, days_since_closed_issue)
    stars_pts = stargazers * 0.6
    commits_pts = 1000 / (days_since_last_commit + 1)
    issues_pts = 400 / (days_since_closed_issue + 1)

    stars_pts + commits_pts + issues_pts
  end
end
