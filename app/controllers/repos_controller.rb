class ReposController < ApplicationController
  def index
    hub_repos = 10.times.map do |i|
      GithubRepo.new("Repo #{i}", "http://www.example.com", "https://github.com/images/error/octocat_happy.gif",
        "octocat", rand(0..400), rand(60.days.ago.to_date..Date.today),
        rand(60.days.ago.to_date..Date.today))
    end

    @repositories = Ranker.rate_repos(*hub_repos)
  end
end
