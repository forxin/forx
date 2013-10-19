class GithubRepo < Struct.new(:name, :url, :user_avatar, :username, :stargazers, :last_commit_on, :last_issue_closed_on)
end
