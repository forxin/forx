require 'spec_helper'

describe Ranker do
  def test_repos(old_repo_options, new_repo_options)
    # Factories?
    old_repo = GithubRepo.new('Repo 1', 'http://www.example.com', 'avatar1',
      'user1', old_repo_options[:stars], old_repo_options[:last_commit_on],
      old_repo_options[:last_issue_closed_on])
    hot_repo = GithubRepo.new('Repo 2', 'http://www.example.com', 'avatar2',
      'user2', new_repo_options[:stars], new_repo_options[:last_commit_on],
      new_repo_options[:last_issue_closed_on])

      repo1, repo2 = Ranker.rate_repos(old_repo, hot_repo)

      # consider to remove this two matchers
      expect(repo1.name).to eq(old_repo.name)
      expect(repo2.name).to eq(hot_repo.name)
      expect(repo2.score).to be > repo1.score
  end

  context 'when repos are identical' do
    it 'should give more importance to repos with recent commit date' do
      test_repos({ stars: 300, last_commit_on: 30.days.ago, last_issue_closed_on: 5.days.ago },
                 { stars: 300, last_commit_on: 3.days.ago, last_issue_closed_on: 5.days.ago })
    end

    it 'should give more importance to repos with more stargazers' do
      test_repos({ stars: 300, last_commit_on: 3.days.ago, last_issue_closed_on: 5.days.ago },
                 { stars: 500, last_commit_on: 3.days.ago, last_issue_closed_on: 5.days.ago })
    end

    it 'should give more importance to repos with more recently closed issue' do
      test_repos({ stars: 300, last_commit_on: 3.days.ago, last_issue_closed_on: 20.days.ago },
                 { stars: 300, last_commit_on: 3.days.ago, last_issue_closed_on: 5.days.ago })
    end
  end

  context 'when repos have similar stargazers' do
    it 'should give more importance to repos with recent commit date' do
      test_repos({ stars: 300, last_commit_on: 30.days.ago, last_issue_closed_on: 3.days.ago },
                 { stars: 100, last_commit_on: 3.days.ago, last_issue_closed_on: 30.days.ago })
    end
  end

  it 'should set scores in percentage' do
    repos = 10.times.map do |repo|
      GithubRepo.new("Repo #{repo}", 'http://www.example.com', 'avatar1',
        'user1', rand(0..400), rand(60.days.ago.to_date..Date.today),
        rand(60.days.ago.to_date..Date.today))
    end

    Ranker.rate_repos(*repos)
          .reduce(0) { |total, repo| total + repo.score }
          .round
          .should be == 100.0
  end
end
